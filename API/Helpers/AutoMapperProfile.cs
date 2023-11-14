using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.PhotoUrl,
                        opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
        }
    }
}