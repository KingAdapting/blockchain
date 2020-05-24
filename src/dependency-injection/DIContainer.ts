import { Container } from 'inversify';

import { TYPES } from './types';
import { HashGeneratorInterface } from '../infrastructure/HashGeneratorInterface';
import { FactoryInterface } from '../infrastructure/FactoryInterface';
import { ManagerInterface } from '../infrastructure/ManagerInterface';
import { ValidatorInterface } from '../infrastructure/ValidatorInterface';
import { ObjectConverterInterface } from '../infrastructure/ObjectConverterInterface';
import { HashGenerator } from '../service/HashGenerator';
import { BlockFactory } from '../service/BlockFactory';
import { BlockchainManager } from '../service/BlockchainManager';
import { BlockValidator } from '../service/BlockValidator';
import { JsonToObjectConverter } from '../service/JsonToObjectConverter';

const DIContainer = new Container();

DIContainer.bind<HashGeneratorInterface>(TYPES.HashGenerator).to(HashGenerator);
DIContainer.bind<FactoryInterface>(TYPES.BlockFactory).to(BlockFactory);
DIContainer.bind<ManagerInterface>(TYPES.BlockchainManager).to(BlockchainManager);
DIContainer.bind<ValidatorInterface>(TYPES.Validator).to(BlockValidator);
DIContainer.bind<ObjectConverterInterface>(TYPES.JsonConverter).to(JsonToObjectConverter);

export { DIContainer };