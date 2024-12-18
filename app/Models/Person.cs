﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class Person
{
    [Key]
    public int Id { get; set; }

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

    [JsonIgnore]
    public ICollection<Loan>? Loans { get; set; }
}
