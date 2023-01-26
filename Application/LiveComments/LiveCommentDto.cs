using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.LiveComments
{
    public class LiveCommentDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
        
        //estas 3 = al author
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}