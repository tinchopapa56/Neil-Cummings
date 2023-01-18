using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string detaile = null)
        {
            StatusCode = statusCode;
            Message = message;
            Detaile = detaile;
        }

     public int StatusCode { get; set; }   
     public string Message { get; set; }
     public string Detaile { get; set; }
    }
}