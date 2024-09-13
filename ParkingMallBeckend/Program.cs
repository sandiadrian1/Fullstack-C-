using Microsoft.EntityFrameworkCore;
using ParkingMallBeckend.Data;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Konfigurasi Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Tambahkan DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppDbContext")));

// Tambahkan layanan autentikasi dengan Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/api/Account/Login"; // Path untuk login
        options.LogoutPath = "/api/Account/Logout"; // Path untuk logout
    });

var app = builder.Build();

// Konfigurasi CORS
app.UseCors(policy => policy.AllowAnyHeader()
                             .AllowAnyMethod()
                             .SetIsOriginAllowed(origin => true)
                             .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Tambahkan middleware autentikasi sebelum otorisasi
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
