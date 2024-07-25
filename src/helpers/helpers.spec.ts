import * as childProcess from 'node:child_process'

import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';

import { getContextFixture } from './testHelpers';
import { executeAnchorCommand } from './index';

const context = getContextFixture()

const mocksPromise = vi.hoisted(async () => {
  const { default: Emitter } = await import('emittery');
  const emitter = new Emitter();

  const stdout = {
    on: emitter.on.bind(emitter),
    setEncoding: vi.fn()
  }

  const stderr = {
    on: emitter.on.bind(emitter),
    setEncoding: vi.fn()
  }

  return {
    emitter,
    spawn: vi.fn().mockReturnValue({ stdout, stderr, on: emitter.on.bind(emitter) }),
  }
})

vi.mock('child_process', async (importOriginal) => {
  type ChildProcess = typeof import('child_process')
  const mod = await importOriginal<ChildProcess>()
  const mocks = await mocksPromise;
  return {
    ...mod,
    spawn: mocks.spawn,
  }
});

describe('Test Helpers', () => {
  const originalOutSetEncoding = process.stdout.setEncoding;
  const originalErrSetEncoding = process.stderr.setEncoding;

  beforeEach(() => {
    process.stdout.setEncoding = vi.fn();
    process.stderr.setEncoding = vi.fn();
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    process.stdout.setEncoding = originalOutSetEncoding;
    process.stderr.setEncoding = originalErrSetEncoding;
  })

  describe('executeAnchorCommand()', () => {
    describe('build', () => {
      it('calls the "anchor build" command', async () => {
        const mocks = await mocksPromise;
        const outputPromise = executeAnchorCommand({ command: 'build' }, context);
  
        mocks.emitter.emit('close', 0)
  
        const output = await outputPromise;

        expect(childProcess.spawn).toHaveBeenNthCalledWith(1, 'anchor', ['build'], expect.any(Object))
        expect(output.success).toBe(true);      
      })
      
      it('fails if the build fails', async () => {
        const mocks = await mocksPromise;
        const outputPromise = executeAnchorCommand({ command: 'build' }, context);
  
        mocks.emitter.emit('data', '---error---')
        mocks.emitter.emit('close', 1)
  
        const output = await outputPromise;

        expect(childProcess.spawn).toHaveBeenNthCalledWith(1, 'anchor', ['build'], expect.any(Object))
        expect(output.success).toBe(false);
      }); 
    })

    describe('test', () => {
      it('calls the "anchor test" command', async () => {
        const mocks = await mocksPromise;
        const outputPromise = executeAnchorCommand({ command: 'test' }, context);
  
        mocks.emitter.emit('close', 0)
  
        const output = await outputPromise;

        expect(childProcess.spawn).toHaveBeenNthCalledWith(1, 'anchor', ['test'], expect.any(Object))
        expect(output.success).toBe(true);   
      });
      
      it('fails if the tests fail', async () => {
        const mocks = await mocksPromise;
        const outputPromise = executeAnchorCommand({ command: 'test' }, context);
  
        mocks.emitter.emit('data', '---fail---')
        mocks.emitter.emit('close', 1)
  
        const output = await outputPromise;

        expect(childProcess.spawn).toHaveBeenNthCalledWith(1, 'anchor', ['test'], expect.any(Object))
        expect(output.success).toBe(false);
      });      
    })

    it('throws if there was an error running the process', async () => {
      const mocks = await mocksPromise;
      const outputPromise = executeAnchorCommand({ command: 'test' }, context);

      mocks.emitter.emit('error', new Error('Boom!!'))

      expect(() => outputPromise).rejects.toThrowError('Boom!!')
    })
  });
});
