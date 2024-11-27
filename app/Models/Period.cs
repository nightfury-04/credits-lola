using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Period
{
    [Key]
    public int Id { get; set; }

    [Required]
    public bool EnTiempo { get; set; }

    public DateTime? FechaDePago { get; set; }

    [Required]
    public int PeriodoDePago { get; set; }

    public double? Monto { get; set; }

    [Required]
    public int LoanId { get; set; }

    [ForeignKey("LoanId")]
    public required Loan Loan { get; set; }
}
