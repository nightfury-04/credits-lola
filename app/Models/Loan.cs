using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models;

public class Loan
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Range(0, 999999.99)]
    public decimal CantidadPrestada { get; set; }

    [Required]
    public DateTime FechaPrestamo { get; set; }

    [Required]
    [Range(1, 31)]
    public int DiaCobro { get; set; }

    [Required]
    [Range(1, 360)]
    public int MesesDelPrestamo { get; set; }

    [Required]
    [Range(0, 100)]
    public int Intereses { get; set; }

    [Required]
    public int PersonId { get; set; }

    [ForeignKey("PersonId")]
    public required Person Person { get; set; }

    [JsonIgnore]
    public ICollection<Period>? Periods { get; set; }
}
