using System;
using Persistence;
using Domain;
using MediatR; 
using FluentValidation;
using Application.Core;

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
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {   
                _context.Activities.Add(request.Activity);

                var res = await _context.SaveChangesAsync() > 0;

                if(!res) return Result<Unit>.Failure("fails to create ACtivity");
                
                return Result<Unit>.Success(Unit.Value); // =void
            }
        }
    }
}