using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.LiveComments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command) //licvecomment.create etc
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.ActivityId.ToString())  //Clients = personas online
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadLIVEComments", result.Value);
        }
    }
}