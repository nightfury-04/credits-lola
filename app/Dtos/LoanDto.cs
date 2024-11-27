using Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace app.Dtos;

public class LoanDto
{
    public int Id { get; set; }

    public decimal CantidadPrestada { get; set; }

    public DateTime FechaPrestamo { get; set; }

    public int DiaCobro { get; set; }

    public int MesesDelPrestamo { get; set; }

    public int Intereses { get; set; }

    public int PersonId { get; set; }
}
