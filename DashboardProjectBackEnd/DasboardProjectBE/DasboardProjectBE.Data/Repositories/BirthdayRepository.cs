using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.Data.Repositories
{
  public class BirthdayRepository : BaseRepository<BirthdayEntity, int>, IBirthdayRepository
  {
    static string resultNames = "";
    private IConfiguration configuration;

    public BirthdayRepository(IUnitOfWork unitOfWork, IConfiguration iConfig) : base(unitOfWork)
    {
      configuration = iConfig;
    }

    public List<BirthdayEntity> GetAllDaily()
    {
      ReadBlobDataAsync();
      List<BirthdayEntity> birthday = Newtonsoft.Json.JsonConvert.DeserializeObject<List<BirthdayEntity>>(resultNames);
      birthday = ConvertUrlToImage(birthday);

      return birthday;
    }

    private void ReadBlobDataAsync()
    {
      string accountName = configuration.GetSection("AppConfiguration").GetSection("accountName").Value;
      string accountKey = configuration.GetSection("AppConfiguration").GetSection("accountKey").Value;
      string containerName = configuration.GetSection("AppConfiguration").GetSection("containerName").Value;

      CloudStorageAccount storageAccount = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
      CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
      CloudBlobContainer container = blobClient.GetContainerReference(containerName);
      IEnumerable<IListBlobItem> blobItemList = container.ListBlobsSegmentedAsync(null).Result.Results;
      List<CloudBlockBlob> blobList = blobItemList.OfType<CloudBlockBlob>().ToList();
      CloudBlockBlob firstBlob = blobList.FirstOrDefault();

      MemoryStream mStream = new MemoryStream();
      firstBlob.DownloadToStreamAsync(mStream).Wait();
      resultNames = Encoding.ASCII.GetString(mStream.ToArray());

    }

    private List<BirthdayEntity> ConvertUrlToImage(List<BirthdayEntity> birthday)
    {

      string userName = configuration.GetSection("AppConfiguration").GetSection("userName").Value;
      string userPassword = configuration.GetSection("AppConfiguration").GetSection("userPassword").Value;

      for (int i = 0; i < birthday.Count; i++)
      {
        WebRequest req = WebRequest.Create(birthday[i].ImageUrl);
        req.Method = "GET";
        req.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.Default.GetBytes(string.Format("{0}:{1}", userName, userPassword)));
        byte[] buf;
        try
        {
          WebResponse resp = req.GetResponse();
          Stream stream = resp.GetResponseStream();
          using (BinaryReader br = new BinaryReader(stream))
          {
            int len = (int)(resp.ContentLength);
            buf = br.ReadBytes(len);
            br.Close();
            stream.Close();
            resp.Close();

          }
        }
        catch
        {
          buf = Properties.Resources.NullBirthdayPhoto;
        }
        birthday[i].ImageUrl = Convert.ToBase64String(buf);

      }

      return birthday;
    }
  }
}
