using System;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ActAtt
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid ActivityId { get; set; }

        public Activity Activity { get; set; }

        public bool IsHost { get; set; }
    }
}