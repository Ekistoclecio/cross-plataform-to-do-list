import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, lastName, email, userName, password } = req.body;

    const emailValidation = await userRepository.findOneBy({ email });
    if (emailValidation) {
      return res
        .status(400)
        .json({ message: "O email informado ja esta cadastrado" });
    }

    const userNameValidation = await userRepository.findOneBy({ userName });
    if (userNameValidation) {
      return res
        .status(400)
        .json({ message: "O nome de usuario informado ja esta cadastrado" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = userRepository.create({
        name,
        lastName,
        email,
        userName,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      return res
        .status(201)
        .json({ message: "Novo usuario criado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  async login(req: Request, res: Response) {
    const { userName, password } = req.body;

    console.log(userName);
    console.log(password);

    const user = await userRepository.findOneBy({ userName });

    if (!user) {
      return res
        .status(400)
        .json({ massage: "Nome de usuario ou senha inválidos" });
    }

    const veruifyPass = await bcrypt.compare(password, user.password);

    if (!veruifyPass) {
      return res
        .status(400)
        .json({ massage: "Nome de usuario ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
      name: user.name,
      lastName: user.lastName,
    });
  }

  async getActiveTasksByUserId(req: Request, res: Response) {
    const user = await userRepository.findOne({
      where: {
        id: req.userId,
      },
      relations: {
        tasks: true,
      },
    });

    console.log(user.tasks);

    const tasksActive = user.tasks.filter((task) => task.isArchived === false);

    if (user) {
      return res.json(tasksActive);
    } else {
      return res
        .status(404)
        .json({ message: "Usuario ou tarefa não encontrado" });
    }
  }

  async getArchivedTasksByUserId(req: Request, res: Response) {
    const user = await userRepository.findOne({
      where: {
        id: req.userId,
      },
      relations: {
        tasks: true,
      },
    });

    console.log(user.tasks);

    const tasksActive = user.tasks.filter((task) => task.isArchived === true);

    if (user) {
      return res.json(tasksActive);
    } else {
      return res
        .status(404)
        .json({ message: "Usuario ou tarefa não encontrado" });
    }
  }
}
