using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }

        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }

    }
}