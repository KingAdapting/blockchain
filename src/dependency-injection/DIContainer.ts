import { Container } from 'inversify';

import { TYPES } from './types';
import { HashGeneratorInterface } from '../infrastructure/HashGeneratorInterface';
import { FactoryInterface } from '../infrastructure/FactoryInterface';
import { ManagerInterface } from '../infrastructure/ManagerInterface';
import { HashGenerator } from '../service/HashGenerator';
import { BlockFactory } from '../service/BlockFactory';
import { BlockchainManager } from '../service/BlockchainManager';

const DIContainer = new Container();

DIContainer.bind<HashGeneratorInterface>(TYPES.HashGenerator).to(HashGenerator);
DIContainer.bind<FactoryInterface>(TYPES.BlockFactory).to(BlockFactory);
DIContainer.bind<ManagerInterface>(TYPES.BlockchainManager).to(BlockchainManager);

export { DIContainer };