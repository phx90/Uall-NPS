namespace NPSApi.Models;

public class Avaliacao
{
    public int Id { get; set; }
    public string CPF { get; set; } = null!;
    public int Nota { get; set; }
    public DateTime DataEnvio { get; set; }
}
