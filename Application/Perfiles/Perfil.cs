using Domain;

namespace Application.Perfiles
{
    public class Perfil
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }

        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }
        public ICollection<Photo> Photos {get;set;}
    }
}