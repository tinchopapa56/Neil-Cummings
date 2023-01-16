using Persistence;
using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // private readonly IMediator _mediator;

        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new Lista.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // return  await _context.Activities.FindAsync(id);
            return await Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            var mediatorSend = await Mediator.Send(new Create.Command {Activity = activity});
            return Ok(mediatorSend);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActiviy(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var mediatorSend = await Mediator.Send(new Delete.Command{Id = id});
            return Ok(mediatorSend);
        }
    }
}