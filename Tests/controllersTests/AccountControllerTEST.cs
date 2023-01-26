using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domains.Domain;
namespace Tests.controllersTests
{
    public class AccountControllerTEST
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountControllerTEST()
        {
            _userManager = A.Fake<userManager<AppUser>>();
            _tokenService = A.Fake<tokenService>();
        }
        [Fact]
        public void AccountController_Login_returnsUnauthorized_when_duplicateEmail()
        {   
            // Arrange
            var mockUserRepository = new Mock<IUserRepository>();
            var mockUserManager = new Mock<IUserManager>();
            var user = A.Fake<User>();

        }
    }
}