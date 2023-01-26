using Application.Activities;
using AutoMapper;
using Application.Perfiles;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
        CreateMap<Activity, Activity>();

        CreateMap<Activity, ActivityDto>() //d=actvityDTO o=options s=activity x=actAtt
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees     //ForMember SELECTs specific property
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));               

        CreateMap<ActAtt, AttendeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
       
        CreateMap<AppUser, Perfil>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
                // .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                // .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                // .ForMember(d => d.Following,
        //CreateMap<Comment, CommentDto>()
        //     .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
        //     .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
        //     .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        // CreateMap<ActivityAttendee, UserActivityDto>()
        //     .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
        //     .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
        //     .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
        //     .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
        //     .ForMember(d => d.HostUsername, o => o.MapFrom(s => 
        //         s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}