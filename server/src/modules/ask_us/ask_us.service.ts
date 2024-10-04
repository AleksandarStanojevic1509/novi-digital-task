import { AskUsRepository } from "./ask_us.repository";
import { IAskUs } from "./interfaces";

export class AskUsService {
  constructor(private askUsRepository: AskUsRepository) {}

  async askUsQuestion(inquire: Partial<IAskUs>): Promise<IAskUs> {
    return await this.askUsRepository.create(inquire);
  }
}
