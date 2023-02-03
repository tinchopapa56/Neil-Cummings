using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    // [AllowAnonymous]    //TEMPORAL
    public class ActivitiesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        // public async Task<IActionResult> GetActivities()
        public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param)
        {
            var res = await Mediator.Send(new Lista.Query{Params = param});
            return HandlePagedResult(res);
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
        [Authorize(Policy = "IsHostDeACT")]    //only host is authorized to do this
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActiviy(Guid id, Activity activity)
        {
            activity.Id = id;
            var res = await Mediator.Send(new Edit.Command{Activity = activity});
            return HandleResult(res);
        }
        [Authorize(Policy = "IsHostDeACT")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var res = await Mediator.Send(new Delete.Command{Id = id});
            return HandleResult(res);
        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult( await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}