using app.Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace app.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PersonController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreatePerson([FromBody] Person person)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Persons.Add(person);
        _context.SaveChanges();

        return Ok(person);
    }

    [HttpGet]
    public IActionResult GetAllPersons()
    {
        var persons = _context.Persons.ToList();
        return Ok(persons);
    }

    [HttpGet("{id}")]
    public IActionResult GetPersonById(int id)
    {
        var person = _context.Persons.Find(id);
        if (person == null)
            return NotFound();

        return Ok(person);
    }

    [HttpPut("{id}")]
    public IActionResult EditPerson(int id, [FromBody] Person updatedPerson)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var person = _context.Persons.Find(id);
        if (person == null)
            return NotFound();

        person.CI = updatedPerson.CI;
        person.Nombre = person.Nombre;
        person.ApellidoMaterno = updatedPerson.ApellidoMaterno;
        person.ApellidoPaterno= updatedPerson.ApellidoPaterno;
        person.Email = updatedPerson.Email;
        person.Telefono = updatedPerson.Telefono;

        _context.SaveChanges();

        return Ok(person);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePerson(int id)
    {
        var person = _context.Persons.Find(id);
        if (person == null)
            return NotFound();

        _context.Persons.Remove(person);
        _context.SaveChanges();

        return NoContent();
    }
}
