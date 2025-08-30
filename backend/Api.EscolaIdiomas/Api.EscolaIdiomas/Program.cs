using Api.EscolaIdiomas.Domain.Interfaces.Alunos;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Api.EscolaIdiomas.Domain.Interfaces.Professores;
using Api.EscolaIdiomas.Domain.Services.Alunos;
using Api.EscolaIdiomas.Domain.Services.Cursos;
using Api.EscolaIdiomas.Domain.Services.Professores;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Api.EscolaIdiomas.Infra.Data.Repositories.Alunos;
using Api.EscolaIdiomas.Infra.Data.Repositories.Cursos;
using Api.EscolaIdiomas.Infra.Data.Repositories.Professores;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "https://localhost:5173", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddSingleton<DatabaseContext>();


builder.Services.AddScoped<IAlunosService, AlunosService>();
builder.Services.AddScoped<IAlunosRepository, AlunosRepository>();

builder.Services.AddScoped<ICursosService, CursosService>();
builder.Services.AddScoped<ICursosRepository, CursosRepository>();

builder.Services.AddScoped<IProfessoresService, ProfessoresService>();
builder.Services.AddScoped<IProfessoresRepository, ProfessoresRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Em desenvolvimento, não redirecionar para HTTPS para evitar problemas de CORS
    // app.UseHttpsRedirection();
}
else
{
    // Em produção, usar redirecionamento HTTPS
    app.UseHttpsRedirection();
}

// Usar CORS ANTES do redirecionamento HTTPS
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
