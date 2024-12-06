using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using NPSApi.Data;
using NPSApi.Models;

namespace NPSApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AvaliacaoController : ControllerBase
{
    private readonly NPSContext _context;

    public AvaliacaoController(NPSContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostAvaliacao([FromBody] Avaliacao avaliacao)
    {
        var jaExiste = await _context.Avaliacoes
            .AnyAsync(a => a.CPF == avaliacao.CPF && a.DataEnvio.Date == DateTime.Today);

        if (jaExiste)
            return BadRequest("Você já enviou uma avaliação hoje.");

        avaliacao.DataEnvio = DateTime.Now;
        _context.Avaliacoes.Add(avaliacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostAvaliacao), new { id = avaliacao.Id }, avaliacao);
    }
[HttpGet("nps")]
public IActionResult GetNPS()
{
    var avaliacoes = _context.Avaliacoes.ToList();

    var total = avaliacoes.Count;

    if (total == 0)
    {
        return Ok(new 
        { 
            NPS = 0, 
            Total = 0, 
            Promotores = 0, 
            Detratores = 0, 
            Neutros = 0 
        });
    }

    var detratores = avaliacoes.Count(a => a.Nota >= 0 && a.Nota <= 6);
    var neutros = avaliacoes.Count(a => a.Nota == 7 || a.Nota == 8);
    var promotores = avaliacoes.Count(a => a.Nota >= 9 && a.Nota <= 10);

    var nps = ((promotores - detratores) / (float)total) * 100;

    return Ok(new 
    { 
        NPS = Math.Round(nps, 2), 
        Total = total, 
        Promotores = promotores, 
        Detratores = detratores, 
        Neutros = neutros 
    });
}

}
