use actix_web::{get, post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool, Postgres};
use uuid::Uuid;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Book {
    id: Uuid,
    title: String,
    author: String,
    description: String,
}

#[get("/book/list")]
pub async fn book_list(connection: web::Data<PgPool>) -> impl Responder {
    let books: Vec<Book> =
        match sqlx::query_as::<Postgres, Book>("SELECT id, title, author, description FROM book")
            .fetch_all(connection.get_ref())
            .await
        {
            Ok(data) => data,
            Err(e) => return HttpResponse::InternalServerError().body(format!("{:?}", e)),
        };
    HttpResponse::Ok().json(books)
}

#[post("/book/add")]
pub async fn book_add(form: web::Form<Book>, connection: web::Data<PgPool>) -> impl Responder {
    match sqlx::query::<Postgres>(
        "INSERT INTO book (id, title, author, description) VALUES ($1, $2, $3, $4)",
    )
    .bind(&form.id)
    .bind(&form.title)
    .bind(&form.author)
    .bind(&form.description)
    .execute(connection.get_ref())
    .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => return HttpResponse::InternalServerError().body(format!("{:?}", e)),
    }
}

#[derive(Deserialize, Debug)]
pub struct DeleteRequest {
    id: Uuid,
}

#[post("/book/delete")]
pub async fn book_delete(
    form: web::Form<DeleteRequest>,
    connection: web::Data<PgPool>,
) -> impl Responder {
    match sqlx::query::<Postgres>("DELETE FROM book WHERE id = $1")
        .bind(&form.id)
        .execute(connection.get_ref())
        .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => return HttpResponse::InternalServerError().body(format!("{:?}", e)),
    }
}
