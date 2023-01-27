using Microsoft.AspNetCore.Mvc;
// using Domain;
// using Application.Activities;
// using Microsoft.AspNetCore.Authorization;
using Application.Followers;
// using MediatR;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            var res = await Mediator.Send(new FollowToggle.Command{TargetUsername = username});
            return HandleResult(res);
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowers(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query{Username = username,
            Predicate = predicate}));
        }
    }
}