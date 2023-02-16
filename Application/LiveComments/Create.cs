using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LiveComments
{
    public class Create
    {
        public class Command : IRequest<Result<LiveCommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        //HANDLER
        public class Handler : IRequestHandler<Command, Result<LiveCommentDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<LiveCommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(x => x.LiveComments)
                    .ThenInclude(x => x.Author)
                    .ThenInclude(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.Id == request.ActivityId);
                // .FindAsync(request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users
                    // .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new LiveComment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.LiveComments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<LiveCommentDto>.Success(_mapper.Map<LiveCommentDto>(comment));

                return Result<LiveCommentDto>.Failure("Faile to add comment");
            }
        }
    }
}