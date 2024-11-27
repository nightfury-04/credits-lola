using app.Data;
using app.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace app.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoanController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LoanController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllLoans()
    {
        var loans = _context.Loans.ToList();
        return Ok(loans);
    }

    [HttpGet("{id}")]
    public IActionResult GetLoanById(int id)
    {
        var loan = _context.Loans.Find(id);
        if (loan == null)
            return NotFound();

        return Ok(loan);
    }

    [HttpPost]
    public IActionResult CreateLoan([FromBody] Loan loan)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Attach(loan.Person);

        _context.Loans.Add(loan);
        _context.SaveChanges();

        var periods = new List<Period>();
        for (int i = 1; i <= loan.MesesDelPrestamo; i++)
        {
            periods.Add(new Period
            {
                EnTiempo = false,
                FechaDePago = null,
                PeriodoDePago = i,
                Monto = null,
                Loan = loan
            });
        }

        _context.Periods.AddRange(periods);
        _context.SaveChanges();

        LoanDto loanDto = new LoanDto
        {
            Id = loan.Id,
            CantidadPrestada = loan.CantidadPrestada,
            FechaPrestamo = loan.FechaPrestamo,
            DiaCobro = loan.DiaCobro,
            MesesDelPrestamo = loan.MesesDelPrestamo,
            Intereses = loan.Intereses,
            PersonId = loan.PersonId
        };

        return Ok(loanDto);
    }

    [HttpPut("{id}")]
    public IActionResult EditLoan(int id, [FromBody] Loan updatedLoan)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var loan = _context.Loans.Find(id);
        if (loan == null)
            return NotFound();

        loan.CantidadPrestada = updatedLoan.CantidadPrestada;
        loan.FechaPrestamo = updatedLoan.FechaPrestamo;
        loan.DiaCobro = updatedLoan.DiaCobro;
        loan.MesesDelPrestamo = updatedLoan.MesesDelPrestamo;
        loan.Intereses = updatedLoan.Intereses;

        _context.SaveChanges();

        return Ok(loan);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteLoan(int id)
    {
        var loan = _context.Loans.Find(id);
        if (loan == null)
            return NotFound();

        _context.Loans.Remove(loan);
        _context.SaveChanges();

        return NoContent();
    }
}
