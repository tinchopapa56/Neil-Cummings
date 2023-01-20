using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var res = await Mediator.Send(new Lista.Query());
            return HandleResult(res);
        }
        // [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var res = await Mediator.Send(new Details.Query{Id = id}); //activity o null
            return HandleResult(res); //logic in api controller & abstract result Class
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            var res = await Mediator.Send(new Create.Command {Activity = activity});
            return HandleResult(res);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActiviy(Guid id, Activity activity)
        {
            activity.Id = id;
            var res = await Mediator.Send(new Edit.Command{Activity = activity});
            return HandleResult(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var res = await Mediator.Send(new Delete.Command{Id = id});
            return HandleResult(res);
        }
    }
}