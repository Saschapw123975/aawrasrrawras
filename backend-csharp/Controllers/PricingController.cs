using Microsoft.AspNetCore.Mvc;

namespace BackendCSharp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private const string StripeCheckoutUrl = "https://buy.stripe.com/14A00kdlSdny7ZL14qaR203";
    private const double CrymsonPrice = 13.00;

    [HttpGet]
    public IActionResult GetPricing()
    {
        Response.Headers.Append("Cache-Control", "public, max-age=3600");

        return Ok(new
        {
            price = CrymsonPrice,
            type = "one-time",
            checkout_url = StripeCheckoutUrl
        });
    }

    [HttpGet("checkout")]
    public IActionResult GetCheckout()
    {
        return Ok(new
        {
            checkout_url = StripeCheckoutUrl,
            price = CrymsonPrice
        });
    }
}

