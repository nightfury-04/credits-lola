using Microsoft.AspNetCore.Mvc;
using app.Data;

namespace app.Controllers;

public class TestController : Controller
{
    private readonly ApplicationDbContext _context;

    public TestController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("test-connection")]
    public IActionResult TestConnection()
    {
        try
        {
            // Check if the database can be accessed
            if (_context.Database.CanConnect())
            {
                return Ok("Connection to the database was successful!");
            }
            else
            {
                return StatusCode(500, "Unable to connect to the database.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Connection Failed: {ex.Message}");
        }
    }
}

