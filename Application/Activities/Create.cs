using System;
using Persistence;
using Domain;
using MediatR; 
using FluentValidation;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest //command = no retorna nada
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {   
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                
                return Unit.Value; // =void
            }
        }
    }
}