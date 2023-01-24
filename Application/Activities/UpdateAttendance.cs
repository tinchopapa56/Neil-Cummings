using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;            
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities
                    .Include(a => a.Attendees) //Eagerly load
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);  //si hay mas de 1 aggara SOLO el 1ro.
                    // .SingleOrDefault(x => x.Id == request.Id);   //si hay mas de 1 aggara SOLO el 1ro y tira EXCEPTION

                if(act == null) return null; //null en Result<Unit> ddevuelve NotFound()

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());
                
                if(user == null) return null;

                var hostUsername = act.Attendees.SingleOrDefault(x => x.IsHost)?.AppUser?.UserName;
                var attendance = act.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                //si es el host, cancela el evento
                    if(attendance != null && hostUsername == user.UserName) act.IsCanceled = !act.IsCanceled;
                //si NO es host, cancela su attendance
                    if(attendance != null && hostUsername != user.UserName) act.Attendees.Remove(attendance);
                //si No es host, inscibirse en el evento
                    if(attendance == null) 
                    {
                        attendance = new Domain.ActAtt
                        {
                            AppUser = user,
                            Activity = act,
                            IsHost = false
                        };
                        act.Attendees.Add(attendance);
                    }
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating val");
            }
        }
    }
}