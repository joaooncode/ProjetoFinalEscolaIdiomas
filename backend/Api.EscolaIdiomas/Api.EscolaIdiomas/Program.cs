using Api.EscolaIdiomas.Domain.Interfaces.Alunos;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Api.EscolaIdiomas.Domain.Services.Alunos;
using Api.EscolaIdiomas.Domain.Services.Cursos;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Api.EscolaIdiomas.Infra.Data.Repositories.Alunos;
using Api.EscolaIdiomas.Infra.Data.Repositories.Cursos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddSingleton<DatabaseContext>();


builder.Services.AddScoped<IAlunosService, AlunosService>();
builder.Services.AddScoped<IAlunosRepository, AlunosRepository>();

builder.Services.AddScoped<ICursosService, CursosService>();
builder.Services.AddScoped<ICursosRepository, CursosRepository>();

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
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
