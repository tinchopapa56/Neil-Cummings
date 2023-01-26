using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Fotos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id {get;set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccesor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccesor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if(user == null) return null; //Result con null returns NotFound() 

                var photo = _context.Photos.FirstOrDefault(x => x.Id == request.Id);  //no es async pórq en la petiicon de user ya trajimos la db, no hace falta volver
                if(photo == null) return null;
                if(photo.IsMain) return Result<Unit>.Failure("you cant delete your main pic");

                var res = await _photoAccessor.DeletePhoto(photo.Id);
                if(res==null) return Result<Unit>.Failure("problem erasing the ph in Cloudaniry");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem deleting ph in API - aunque en cloudinary se borro bien");
            }
        }
    }
}