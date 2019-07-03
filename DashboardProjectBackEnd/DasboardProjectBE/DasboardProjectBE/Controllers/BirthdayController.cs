using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Threading;
using Microsoft.Azure.ServiceBus;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json.Linq;
using System.Net;

namespace DasboardProjectBE.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class BirthdayController : ControllerBase
	{
		static string resultNames = "";

		private readonly IBirthdayService birthdayService;

		public BirthdayController(IBirthdayService birthdayService)
		{
			this.birthdayService = birthdayService ?? throw new ArgumentNullException(nameof(IBirthdayService));
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{

			ReadBlobDataAsync();
			List<DailyBirthdaysViewModel> birthday = Newtonsoft.Json.JsonConvert.DeserializeObject<List<DailyBirthdaysViewModel>>(resultNames);
			birthday = ConvertUrlToImage(birthday);
			if (resultNames != null)
			{
				return Ok(birthday);
			}
			return BadRequest();

		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var result = (await birthdayService.GetByIdAsync(id)).ToViewModel();
			if (result != null)
			{
				return Ok(result);
			}
			return BadRequest();
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody]IEnumerable<BirthdayViewModel> values)
		{
			IEnumerable<BirthdayViewModel> result = null;
			if (ModelState.IsValid)
			{
				result = (await birthdayService.AddAllAsync(values.Select(y => y.ToDto()))).Select(y => y.ToViewModel());
			}

			return Created("{id}", result);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, [FromBody]BirthdayViewModel value)
		{
			BirthdayViewModel result = null;
			if (ModelState.IsValid)
			{
				result = (await birthdayService.UpdateAsync(value.ToDto())).ToViewModel();
			}

			return Accepted(result);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
			=> Ok(await birthdayService.DeleteAsync(id));



		private static async void ReadBlobDataAsync()
		{
			string accountName = "servicebuscontent";
			string accountKey = "shipwFGrWch4v8DLXmKGnwI16X0FCaNcRGuSftGpd4eM2SIhjTsAQ3rJt1z5Zo3/KqGb+qBm/AyTlVHiRUh+qw==";
			string containerName = "birthscontent";

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


		private List<DailyBirthdaysViewModel> ConvertUrlToImage(List<DailyBirthdaysViewModel> birthday)
		{
			for (int i = 0; i < birthday.Count; i++)
			{
				WebRequest req = WebRequest.Create(birthday[i].ImageUrl);
				req.Method = "GET";
				req.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.Default.GetBytes("SSharepoint:sharepasiona"));
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