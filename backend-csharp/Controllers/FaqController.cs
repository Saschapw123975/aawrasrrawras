using Microsoft.AspNetCore.Mvc;

namespace BackendCSharp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FaqController : ControllerBase
{
    [HttpGet]
    public IActionResult GetFaq()
    {
        Response.Headers.Append("Cache-Control", "public, max-age=3600");

        return Ok(new
        {
            faqs = new[]
            {
                new { question = "Is Crymson free?", answer = "No, it's a one-time $13 purchase for lifetime access." },
                new { question = "What do I get?", answer = "All games free, cloud saves, priority servers, forever." },
                new { question = "Is this a subscription?", answer = "No! Pay $13 once, never again." },
                new { question = "Are games really free?", answer = "Yes, every game is free with Crymson." },
                new { question = "How do I pay?", answer = "Secure Stripe checkout, cards accepted." }
            }
        });
    }
}

