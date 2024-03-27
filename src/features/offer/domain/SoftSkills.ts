import { InvalidArgument } from '../../../shared/domain/InvalidArgument';
import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';

export class SoftSkills extends StringValueObject {
  public static readonly COMMUNICATION = new SoftSkills('COMMUNICATION');
  public static readonly LEADERSHIP = new SoftSkills('LEADERSHIP');
  public static readonly TEAMWORK = new SoftSkills('TEAMWORK');
  public static readonly PROBLEM_SOLVING = new SoftSkills('PROBLEM_SOLVING');
  public static readonly TIME_MANAGEMENT = new SoftSkills('TIME_MANAGEMENT');
  public static readonly ADAPTABILITY = new SoftSkills('ADAPTABILITY');
  public static readonly CREATIVITY = new SoftSkills('CREATIVITY');
  public static readonly CRITICAL_THINKING = new SoftSkills(
    'CRITICAL_THINKING',
  );
  public static readonly DECISION_MAKING = new SoftSkills('DECISION_MAKING');
  public static readonly ATTENTION_TO_DETAIL = new SoftSkills(
    'ATTENTION_TO_DETAIL',
  );
  public static readonly ORGANIZATION = new SoftSkills('ORGANIZATION');
  public static readonly NEGOTIATION = new SoftSkills('NEGOTIATION');
  public static readonly EMOTIONAL_INTELLIGENCE = new SoftSkills(
    'EMOTIONAL_INTELLIGENCE',
  );
  public static readonly FLEXIBILITY = new SoftSkills('FLEXIBILITY');
  public static readonly STRESS_MANAGEMENT = new SoftSkills(
    'STRESS_MANAGEMENT',
  );
  public static readonly NETWORKING = new SoftSkills('NETWORKING');
  public static readonly CONFLICT_RESOLUTION = new SoftSkills(
    'CONFLICT_RESOLUTION',
  );
  public static readonly ANALYTICAL_SKILLS = new SoftSkills(
    'ANALYTICAL_SKILLS',
  );
  public static readonly CUSTOMER_SERVICE = new SoftSkills('CUSTOMER_SERVICE');
  private static readonly allowedValues = [
    SoftSkills.COMMUNICATION,
    SoftSkills.LEADERSHIP,
    SoftSkills.TEAMWORK,
    SoftSkills.PROBLEM_SOLVING,
    SoftSkills.TIME_MANAGEMENT,
    SoftSkills.ADAPTABILITY,
    SoftSkills.CREATIVITY,
    SoftSkills.CRITICAL_THINKING,
    SoftSkills.DECISION_MAKING,
    SoftSkills.ATTENTION_TO_DETAIL,
    SoftSkills.ORGANIZATION,
    SoftSkills.NEGOTIATION,
    SoftSkills.EMOTIONAL_INTELLIGENCE,
    SoftSkills.FLEXIBILITY,
    SoftSkills.STRESS_MANAGEMENT,
    SoftSkills.NETWORKING,
    SoftSkills.CONFLICT_RESOLUTION,
    SoftSkills.ANALYTICAL_SKILLS,
    SoftSkills.CUSTOMER_SERVICE,
  ];

  protected constructor(value: string) {
    super(value);
  }

  public static from(value: string) {
    for (const allowedValue of SoftSkills.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid soft skill. Allowed values [${SoftSkills.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
