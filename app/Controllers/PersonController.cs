using app.Data;
using app.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        var persons = _context.Persons
        .Include(p => p.Loans) // Eagerly load Loans
        .Select(p => new PersonDto
        {
            Id = p.Id,
            CI = p.CI,
            Nombre = p.Nombre,
            ApellidoPaterno = p.ApellidoPaterno,
            ApellidoMaterno = p.ApellidoMaterno,
            Telefono = p.Telefono,
            Email = p.Email,
            Loans = p.Loans.Select(l => new LoanDto
            {
                Id = l.Id,
                CantidadPrestada = l.CantidadPrestada,
                FechaPrestamo = l.FechaPrestamo,
                DiaCobro = l.DiaCobro,
                MesesDelPrestamo = l.MesesDelPrestamo,
                Intereses = l.Intereses,
                PersonId = l.PersonId
            }).ToList()
        })
        .ToList();

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
