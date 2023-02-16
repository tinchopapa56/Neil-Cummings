using Persistence;
using Domain;
using MediatR; 
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //command = no retorna nada
        {
            public Activity Activity {get;set;}
        }
        // public class CommandValidator : AbstractValidator<Activity>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {   
                /*Attendees creation*/
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                        
                    var attendee = new ActAtt
                    {
                        AppUser = user,
                        Activity = request.Activity,
                        IsHost = true
                    };
                    request.Activity.Attendees.Add(attendee);
                /*Ends attendees creation*/

                _context.Activities.Add(request.Activity);

                var res = await _context.SaveChangesAsync() > 0;

                if(!res) return Result<Unit>.Failure("fails to create ACtivity");
                
                return Result<Unit>.Success(Unit.Value); // =void
            }
        }
    }
}