package dao;

import exception.DaoException;
import exception.LoginException;
import exception.RegisterException;
import model.Instructor;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.UUID;

public class Sql2oInstructorDao implements InstructorDao{
    private Sql2o sql2o;

    public Sql2oInstructorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public Instructor checkUserIdentity(String email, String pswd) {
        Instructor instructor;
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId, name, email FROM instructor Where email = :email AND pswd = :pswd;";
            instructor =  conn.createQuery(sql)
                    .addParameter("email", email)
                    .addParameter("pswd", pswd)
                    .executeAndFetchFirst(Instructor.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (instructor == null) {
            throw new LoginException("User authentication failure. Please input again.");
        }

        return instructor; // return userId if find this instructor
    }

    @Override
    public void registerUser(Instructor instructor) {
        Integer id;
        // user not exist then register, otherwise throw UserException
        // email must be unique
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT instructorId FROM instructor Where email = :email;";
            id =  conn.createQuery(sql)
                    .addParameter("email", instructor.getEmail())
                    .executeScalar(Integer.class);
        } catch (Sql2oException ex) {
            throw new DaoException("Database error", ex);
        }

        if (id != null) {
            throw new RegisterException("User already exists with the same email. " +
                    "Please modify your register info.");
        }

        System.out.println("user not exists, register permit.");
        try (Connection conn = sql2o.open()) {
            String sql = "INSERT INTO instructor(name, email, pswd) VALUES (:name, :email, :pswd);";
            id = (int) conn.createQuery(sql, true)
                    .addParameter("name", instructor.getName())
                    .addParameter("email", instructor.getEmail())
                    .addParameter("pswd", instructor.getPswd())
                    .executeUpdate()
                    .getKey(); // Returns the key this connection is associated with.

            instructor.setInstructorId(id);
            System.out.println("Register user successfully.");
        } catch (Sql2oException ex1) {
            throw new DaoException("Unable to register the user.", ex1);
        }
    }

    @Override
    public void storeUserFileInfo(int userId, UUID uuid, String url) {

    }
}
