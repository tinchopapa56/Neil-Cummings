using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domains.Domain;

namespace Tests.ActivitiesControllerTESTS
{
    public class ActivitiesControllerTESTS
    {
        private readonly DataContext _context;
        private readonly UserAccessor _userAccesor;
        public ActivitiesControllerTESTS()
        {
            _context = A.Fake<DataContext>();
            _userAccessor = A.Fake<UserAccessor>();
        }
        [Fact]
        public async Task Handle_Should_ReturnNotFound_WhenNULLactivity()
        {   
            var mockACT = new Activity{
                Id = "fasfasfafaf",
                Title = "test",
                Date = "test",
                Description = "test",
                Category = "test",
                City = "test",
                Venue = "test",
                Attendees = List<ActAtt>,
            };
            // Arrange
            // var command = new Create.Command(mockACT); //ACtivity, returns RESULT.succes o failure
            var command = new Create.Command(null); //ACtivity, returns RESULT.succes o failure
            var handler = new Create.Handler(_context, _userAccesor);

            // Act
            var result = await handler.Handle(command); 
            handleResult(result).Should().BeOfType<NotFound>;
        }
    }
}