import { GenerateTokenService } from "../services/GenerateTokenService";

class GenerateTokenController {
  async handle(userId: string) {
    const service = new GenerateTokenService();
    const result = await service.execute({ userId });

    return result;
  }
};

export { GenerateTokenController };
