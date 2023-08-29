import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";

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

    try {
      const newUser = userRepository.create({
        name,
        lastName,
        email,
        userName,
        password,
      });

      await userRepository.save(newUser);

      return res.status(201).json({ message: "Usuario criado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  async login(req: Request, res: Response) {
    return res.json({ massege: "ROTA DE LOGIN" });
  }

  async getTasksArrayByUserId(req: Request, res: Response) {
    const { User_id } = req.params;

    const user = await userRepository.findOne({
      where: {
        id: User_id,
      },
      relations: {
        tasks: true,
      },
    });

    console.log(user.tasks);

    if (user) {
      return res.json(user.tasks);
    } else {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
  }
}
