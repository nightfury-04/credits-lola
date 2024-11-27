using System.ComponentModel.DataAnnotations;

namespace app.Dtos;

public class PersonDto
{
    public int Id { get; set; }

    public required string CI { get; set; }

    public required string Nombre { get; set; }

    public required string ApellidoPaterno { get; set; }

    public required string ApellidoMaterno { get; set; }

    public string? Telefono { get; set; }

    public required string Email { get; set; }

    public List<LoanDto>? Loans { get; set; }
}
