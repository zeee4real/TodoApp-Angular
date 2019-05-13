using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TodoServices.Models;

namespace TodoServices.Controllers
{
    public class TodoController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Todo
        public IQueryable<ToDoInfo> GetToDoInfoes()
        {
            return db.ToDoInfoes;
        }

        // PUT: api/Todo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDoInfo(int id, ToDoInfo toDoInfo)
        {

            if (id != toDoInfo.ID)
            {
                return BadRequest();
            }

            db.Entry(toDoInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Todo
        [ResponseType(typeof(ToDoInfo))]
        public IHttpActionResult PostToDoInfo(ToDoInfo toDoInfo)
        {
            toDoInfo.Created = DateTime.Now.ToString();
            toDoInfo.CurrStatus = true;
            db.ToDoInfoes.Add(toDoInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDoInfo.ID }, toDoInfo);
        }

        // DELETE: api/Todo/5
        [ResponseType(typeof(ToDoInfo))]
        public IHttpActionResult DeleteToDoInfo(int id)
        {
            ToDoInfo toDoInfo = db.ToDoInfoes.Find(id);
            if (toDoInfo == null)
            {
                return NotFound();
            }

            db.ToDoInfoes.Remove(toDoInfo);
            db.SaveChanges();

            return Ok(toDoInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoInfoExists(int id)
        {
            return db.ToDoInfoes.Count(e => e.ID == id) > 0;
        }
    }
}