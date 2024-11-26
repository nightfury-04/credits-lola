using System.ComponentModel.DataAnnotations;

namespace Models;

public class Person
{
    [Key]
    [Required]
    [MaxLength(11)]
    public required string CI { get; set; }

    [Required]
    [MaxLength(150)]
    public required string Nombre { get; set; }

    [Required]
    [MaxLength(50)]
    public required string ApellidoPaterno { get; set; }

    [Required]
    [MaxLength(50)]
    public required string ApellidoMaterno { get; set; }

    [MaxLength(32)]
    public string? Telefono { get; set; }

    [Required]
    [MaxLength(200)]
    [EmailAddress]
    public required string Email { get; set; }
}
