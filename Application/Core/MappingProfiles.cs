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

        CreateMap<ActAtt, Perfil>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}