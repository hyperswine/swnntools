'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const RISCVReference = () => {
  const [expandedSections, setExpandedSections] = useState({
    registers: true,
    integer: true,
    loads: false,
    stores: false,
    branches: false,
    jumps: false,
    atomic: false,
    vector: false,
    vectorConfig: false,
    vectorArith: false,
    vectorMem: false,
    vectorMask: false,
    system: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const registers = [
    { name: 'x0', abi: 'zero', usage: 'Hard-wired zero', saver: '-' },
    { name: 'x1', abi: 'ra', usage: 'Return address', saver: 'Caller' },
    { name: 'x2', abi: 'sp', usage: 'Stack pointer', saver: 'Callee' },
    { name: 'x3', abi: 'gp', usage: 'Global pointer', saver: '-' },
    { name: 'x4', abi: 'tp', usage: 'Thread pointer', saver: '-' },
    { name: 'x5-x7', abi: 't0-t2', usage: 'Temporaries', saver: 'Caller' },
    { name: 'x8', abi: 's0/fp', usage: 'Saved/frame pointer', saver: 'Callee' },
    { name: 'x9', abi: 's1', usage: 'Saved register', saver: 'Callee' },
    { name: 'x10-x11', abi: 'a0-a1', usage: 'Args/return values', saver: 'Caller' },
    { name: 'x12-x17', abi: 'a2-a7', usage: 'Arguments', saver: 'Caller' },
    { name: 'x18-x27', abi: 's2-s11', usage: 'Saved registers', saver: 'Callee' },
    { name: 'x28-x31', abi: 't3-t6', usage: 'Temporaries', saver: 'Caller' }
  ]

  const integerInsts = [
    { name: 'add', fmt: 'R', opcode: '0110011', f3: '0x0', f7: '0x00', desc: 'rd = rs1 + rs2' },
    { name: 'sub', fmt: 'R', opcode: '0110011', f3: '0x0', f7: '0x20', desc: 'rd = rs1 - rs2' },
    { name: 'xor', fmt: 'R', opcode: '0110011', f3: '0x4', f7: '0x00', desc: 'rd = rs1 ^ rs2' },
    { name: 'or', fmt: 'R', opcode: '0110011', f3: '0x6', f7: '0x00', desc: 'rd = rs1 | rs2' },
    { name: 'and', fmt: 'R', opcode: '0110011', f3: '0x7', f7: '0x00', desc: 'rd = rs1 & rs2' },
    { name: 'sll', fmt: 'R', opcode: '0110011', f3: '0x1', f7: '0x00', desc: 'rd = rs1 << rs2' },
    { name: 'srl', fmt: 'R', opcode: '0110011', f3: '0x5', f7: '0x00', desc: 'rd = rs1 >> rs2 (logical)' },
    { name: 'sra', fmt: 'R', opcode: '0110011', f3: '0x5', f7: '0x20', desc: 'rd = rs1 >> rs2 (arith)' },
    { name: 'slt', fmt: 'R', opcode: '0110011', f3: '0x2', f7: '0x00', desc: 'rd = (rs1 < rs2) ? 1 : 0 (signed)' },
    { name: 'sltu', fmt: 'R', opcode: '0110011', f3: '0x3', f7: '0x00', desc: 'rd = (rs1 < rs2) ? 1 : 0 (unsigned)' },
    { name: 'addi', fmt: 'I', opcode: '0010011', f3: '0x0', f7: '-', desc: 'rd = rs1 + imm' },
    { name: 'xori', fmt: 'I', opcode: '0010011', f3: '0x4', f7: '-', desc: 'rd = rs1 ^ imm' },
    { name: 'ori', fmt: 'I', opcode: '0010011', f3: '0x6', f7: '-', desc: 'rd = rs1 | imm' },
    { name: 'andi', fmt: 'I', opcode: '0010011', f3: '0x7', f7: '-', desc: 'rd = rs1 & imm' },
    { name: 'slli', fmt: 'I', opcode: '0010011', f3: '0x1', f7: '0x00', desc: 'rd = rs1 << imm' },
    { name: 'srli', fmt: 'I', opcode: '0010011', f3: '0x5', f7: '0x00', desc: 'rd = rs1 >> imm (logical)' },
    { name: 'srai', fmt: 'I', opcode: '0010011', f3: '0x5', f7: '0x20', desc: 'rd = rs1 >> imm (arith)' },
    { name: 'slti', fmt: 'I', opcode: '0010011', f3: '0x2', f7: '-', desc: 'rd = (rs1 < imm) ? 1 : 0 (signed)' },
    { name: 'sltiu', fmt: 'I', opcode: '0010011', f3: '0x3', f7: '-', desc: 'rd = (rs1 < imm) ? 1 : 0 (unsigned)' },
    { name: 'lui', fmt: 'U', opcode: '0110111', f3: '-', f7: '-', desc: 'rd = imm << 12' },
    { name: 'auipc', fmt: 'U', opcode: '0010111', f3: '-', f7: '-', desc: 'rd = pc + (imm << 12)' }
  ]

  const loadInsts = [
    { name: 'lb', fmt: 'I', opcode: '0000011', f3: '0x0', desc: 'rd = sext(mem[rs1+imm][7:0])' },
    { name: 'lh', fmt: 'I', opcode: '0000011', f3: '0x1', desc: 'rd = sext(mem[rs1+imm][15:0])' },
    { name: 'lw', fmt: 'I', opcode: '0000011', f3: '0x2', desc: 'rd = sext(mem[rs1+imm][31:0])' },
    { name: 'ld', fmt: 'I', opcode: '0000011', f3: '0x3', desc: 'rd = mem[rs1+imm][63:0]' },
    { name: 'lbu', fmt: 'I', opcode: '0000011', f3: '0x4', desc: 'rd = zext(mem[rs1+imm][7:0])' },
    { name: 'lhu', fmt: 'I', opcode: '0000011', f3: '0x5', desc: 'rd = zext(mem[rs1+imm][15:0])' },
    { name: 'lwu', fmt: 'I', opcode: '0000011', f3: '0x6', desc: 'rd = zext(mem[rs1+imm][31:0])' }
  ]

  const storeInsts = [
    { name: 'sb', fmt: 'S', opcode: '0100011', f3: '0x0', desc: 'mem[rs1+imm][7:0] = rs2[7:0]' },
    { name: 'sh', fmt: 'S', opcode: '0100011', f3: '0x1', desc: 'mem[rs1+imm][15:0] = rs2[15:0]' },
    { name: 'sw', fmt: 'S', opcode: '0100011', f3: '0x2', desc: 'mem[rs1+imm][31:0] = rs2[31:0]' },
    { name: 'sd', fmt: 'S', opcode: '0100011', f3: '0x3', desc: 'mem[rs1+imm][63:0] = rs2[63:0]' }
  ]

  const branchInsts = [
    { name: 'beq', fmt: 'B', opcode: '1100011', f3: '0x0', desc: 'if (rs1 == rs2) pc += imm' },
    { name: 'bne', fmt: 'B', opcode: '1100011', f3: '0x1', desc: 'if (rs1 != rs2) pc += imm' },
    { name: 'blt', fmt: 'B', opcode: '1100011', f3: '0x4', desc: 'if (rs1 < rs2) pc += imm (signed)' },
    { name: 'bge', fmt: 'B', opcode: '1100011', f3: '0x5', desc: 'if (rs1 >= rs2) pc += imm (signed)' },
    { name: 'bltu', fmt: 'B', opcode: '1100011', f3: '0x6', desc: 'if (rs1 < rs2) pc += imm (unsigned)' },
    { name: 'bgeu', fmt: 'B', opcode: '1100011', f3: '0x7', desc: 'if (rs1 >= rs2) pc += imm (unsigned)' }
  ]

  const jumpInsts = [
    { name: 'jal', fmt: 'J', opcode: '1101111', f3: '-', desc: 'rd = pc+4; pc += imm' },
    { name: 'jalr', fmt: 'I', opcode: '1100111', f3: '0x0', desc: 'rd = pc+4; pc = (rs1+imm)&~1' }
  ]

  const atomicInsts = [
    { name: 'lr.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x02', desc: 'rd = mem[rs1]; reserve rs1' },
    { name: 'sc.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x03', desc: 'if reserved: mem[rs1]=rs2, rd=0 else rd=1' },
    { name: 'amoswap.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x01', desc: 'rd = mem[rs1]; mem[rs1] = rs2' },
    { name: 'amoadd.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x00', desc: 'rd = mem[rs1]; mem[rs1] += rs2' },
    { name: 'amoand.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x0C', desc: 'rd = mem[rs1]; mem[rs1] &= rs2' },
    { name: 'amoor.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x08', desc: 'rd = mem[rs1]; mem[rs1] |= rs2' },
    { name: 'amoxor.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x04', desc: 'rd = mem[rs1]; mem[rs1] ^= rs2' },
    { name: 'amomax.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x14', desc: 'rd = mem[rs1]; mem[rs1] = max(mem[rs1],rs2)' },
    { name: 'amomin.d', fmt: 'R', opcode: '0101111', f3: '0x3', f7: '0x10', desc: 'rd = mem[rs1]; mem[rs1] = min(mem[rs1],rs2)' }
  ]

  const systemInsts = [
    { name: 'fence', fmt: 'I', opcode: '0001111', f3: '0x0', desc: 'Memory ordering fence' },
    { name: 'ecall', fmt: 'I', opcode: '1110011', f3: '0x0', desc: 'Environment call (imm=0)' },
    { name: 'ebreak', fmt: 'I', opcode: '1110011', f3: '0x0', desc: 'Breakpoint (imm=1)' }
  ]

  const vectorConfigInsts = [
    { name: 'vsetvli', fmt: 'I', opcode: '1010111', f3: '0x7', desc: 'vl = rd = AVL, vtype = zimm[10:0]' },
    { name: 'vsetivli', fmt: 'I', opcode: '1010111', f3: '0x7', desc: 'vl = rd = uimm[4:0], vtype = zimm[9:0]' },
    { name: 'vsetvl', fmt: 'R', opcode: '1010111', f3: '0x7', f7: '0x40', desc: 'vl = rd = AVL (rs1), vtype = rs2' }
  ]

  const vectorArithInsts = [
    { name: 'vadd.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x00', desc: 'vd[i] = vs2[i] + vs1[i]' },
    { name: 'vadd.vx', fmt: 'V', opcode: '1010111', f3: '0x4', f6: '0x00', desc: 'vd[i] = vs2[i] + rs1' },
    { name: 'vadd.vi', fmt: 'V', opcode: '1010111', f3: '0x3', f6: '0x00', desc: 'vd[i] = vs2[i] + imm[4:0]' },
    { name: 'vsub.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x02', desc: 'vd[i] = vs2[i] - vs1[i]' },
    { name: 'vsub.vx', fmt: 'V', opcode: '1010111', f3: '0x4', f6: '0x02', desc: 'vd[i] = vs2[i] - rs1' },
    { name: 'vmul.vv', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x25', desc: 'vd[i] = vs2[i] * vs1[i]' },
    { name: 'vmul.vx', fmt: 'V', opcode: '1010111', f3: '0x6', f6: '0x25', desc: 'vd[i] = vs2[i] * rs1' },
    { name: 'vdiv.vv', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x21', desc: 'vd[i] = vs2[i] / vs1[i] (signed)' },
    { name: 'vdivu.vv', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x20', desc: 'vd[i] = vs2[i] / vs1[i] (unsigned)' },
    { name: 'vand.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x09', desc: 'vd[i] = vs2[i] & vs1[i]' },
    { name: 'vor.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x0A', desc: 'vd[i] = vs2[i] | vs1[i]' },
    { name: 'vxor.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x0B', desc: 'vd[i] = vs2[i] ^ vs1[i]' },
    { name: 'vsll.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x25', desc: 'vd[i] = vs2[i] << vs1[i]' },
    { name: 'vsrl.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x28', desc: 'vd[i] = vs2[i] >> vs1[i] (logical)' },
    { name: 'vsra.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x29', desc: 'vd[i] = vs2[i] >> vs1[i] (arith)' },
    { name: 'vmax.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x07', desc: 'vd[i] = max(vs2[i], vs1[i])' },
    { name: 'vmin.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x05', desc: 'vd[i] = min(vs2[i], vs1[i])' }
  ]

  const vectorMemInsts = [
    { name: 'vle8.v', fmt: 'V', opcode: '0000111', f3: '0x0', desc: 'vd[i] = mem8[rs1 + i]' },
    { name: 'vle16.v', fmt: 'V', opcode: '0000111', f3: '0x5', desc: 'vd[i] = mem16[rs1 + i*2]' },
    { name: 'vle32.v', fmt: 'V', opcode: '0000111', f3: '0x6', desc: 'vd[i] = mem32[rs1 + i*4]' },
    { name: 'vle64.v', fmt: 'V', opcode: '0000111', f3: '0x7', desc: 'vd[i] = mem64[rs1 + i*8]' },
    { name: 'vse8.v', fmt: 'V', opcode: '0100111', f3: '0x0', desc: 'mem8[rs1 + i] = vs3[i]' },
    { name: 'vse16.v', fmt: 'V', opcode: '0100111', f3: '0x5', desc: 'mem16[rs1 + i*2] = vs3[i]' },
    { name: 'vse32.v', fmt: 'V', opcode: '0100111', f3: '0x6', desc: 'mem32[rs1 + i*4] = vs3[i]' },
    { name: 'vse64.v', fmt: 'V', opcode: '0100111', f3: '0x7', desc: 'mem64[rs1 + i*8] = vs3[i]' },
    { name: 'vlse.v', fmt: 'V', opcode: '0000111', f3: '0x2/6/7', desc: 'Strided load: vd[i] = mem[rs1 + i*rs2]' },
    { name: 'vsse.v', fmt: 'V', opcode: '0100111', f3: '0x2/6/7', desc: 'Strided store: mem[rs1 + i*rs2] = vs3[i]' },
    { name: 'vlxei.v', fmt: 'V', opcode: '0000111', f3: '0x1', desc: 'Indexed load: vd[i] = mem[rs1 + vs2[i]]' },
    { name: 'vsxei.v', fmt: 'V', opcode: '0100111', f3: '0x1', desc: 'Indexed store: mem[rs1 + vs2[i]] = vs3[i]' }
  ]

  const vectorMaskInsts = [
    { name: 'vmseq.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x18', desc: 'vd[i] = (vs2[i] == vs1[i])' },
    { name: 'vmsne.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x19', desc: 'vd[i] = (vs2[i] != vs1[i])' },
    { name: 'vmslt.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x1B', desc: 'vd[i] = (vs2[i] < vs1[i]) signed' },
    { name: 'vmsltu.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x1A', desc: 'vd[i] = (vs2[i] < vs1[i]) unsigned' },
    { name: 'vmsle.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x1D', desc: 'vd[i] = (vs2[i] <= vs1[i]) signed' },
    { name: 'vmsleu.vv', fmt: 'V', opcode: '1010111', f3: '0x0', f6: '0x1C', desc: 'vd[i] = (vs2[i] <= vs1[i]) unsigned' },
    { name: 'vmand.mm', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x26', desc: 'vd[i] = vs2[i] & vs1[i] (masks)' },
    { name: 'vmor.mm', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x1A', desc: 'vd[i] = vs2[i] | vs1[i] (masks)' },
    { name: 'vmxor.mm', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x1B', desc: 'vd[i] = vs2[i] ^ vs1[i] (masks)' },
    { name: 'vmnot.m', fmt: 'V', opcode: '1010111', f3: '0x2', f6: '0x1D', desc: 'vd[i] = ~vs2[i] (mask)' }
  ]

  const InstructionTable = ({ instructions, title, sectionKey }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center gap-2 text-xl font-bold mb-3 hover:text-blue-600"
      >
        {expandedSections[sectionKey] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        {title}
      </button>
      {expandedSections[sectionKey] && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Instruction</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Format</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Opcode</th>
                <th className="border border-gray-300 px-3 py-2 text-left">funct3</th>
                {instructions[0].f7 && <th className="border border-gray-300 px-3 py-2 text-left">funct7</th>}
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {instructions.map((inst, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{inst.name}</td>
                  <td className="border border-gray-300 px-3 py-2">{inst.fmt}</td>
                  <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{inst.opcode}</td>
                  <td className="border border-gray-300 px-3 py-2 font-mono">{inst.f3}</td>
                  {inst.f7 !== undefined && <td className="border border-gray-300 px-3 py-2 font-mono">{inst.f7}</td>}
                  <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{inst.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">RISC-V Reference: RV64I + A + V Extensions</h1>

      <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500">
        <p className="text-sm">
          This reference covers RV64I (base 64-bit integer), A (atomic), and V (vector) extensions.
          Focus is on instruction encoding and calling conventions for NewML implementation.
        </p>
      </div>

      <section className="mb-8">
        <button
          onClick={() => toggleSection('registers')}
          className="flex items-center gap-2 text-2xl font-bold mb-4 hover:text-blue-600"
        >
          {expandedSections.registers ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          Register Convention
        </button>
        {expandedSections.registers && (
          <>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Register</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">ABI Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Usage</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Saver</th>
                  </tr>
                </thead>
                <tbody>
                  {registers.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-mono">{reg.name}</td>
                      <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{reg.abi}</td>
                      <td className="border border-gray-300 px-3 py-2">{reg.usage}</td>
                      <td className="border border-gray-300 px-3 py-2">{reg.saver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
              <p><strong>Key points:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>x0 (zero):</strong> Always reads as 0, writes ignored</li>
                <li><strong>Caller-saved:</strong> Caller preserves if needed across calls (temps, args, ra)</li>
                <li><strong>Callee-saved:</strong> Callee must preserve if used (s0-s11, sp)</li>
                <li><strong>Return values:</strong> a0-a1 (x10-x11)</li>
                <li><strong>Stack grows down:</strong> sp decremented on entry, incremented on exit</li>
              </ul>
            </div>
          </>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">RV64I: Base Integer Instructions</h2>

        <InstructionTable
          instructions={integerInsts}
          title="Integer Arithmetic & Logic"
          sectionKey="integer"
        />

        <InstructionTable
          instructions={loadInsts}
          title="Load Instructions"
          sectionKey="loads"
        />

        <InstructionTable
          instructions={storeInsts}
          title="Store Instructions"
          sectionKey="stores"
        />

        <InstructionTable
          instructions={branchInsts}
          title="Branch Instructions"
          sectionKey="branches"
        />

        <InstructionTable
          instructions={jumpInsts}
          title="Jump Instructions"
          sectionKey="jumps"
        />

        <InstructionTable
          instructions={systemInsts}
          title="System Instructions"
          sectionKey="system"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">A Extension: Atomic Instructions</h2>

        <InstructionTable
          instructions={atomicInsts}
          title="Atomic Memory Operations"
          sectionKey="atomic"
        />

        <div className="bg-yellow-50 p-4 rounded text-sm mt-4">
          <p className="font-semibold mb-2">Atomic notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>lr.d/sc.d:</strong> Load-reserved/store-conditional pair for lock-free algorithms</li>
            <li><strong>sc.d</strong> can spuriously fail - always check return value and loop</li>
            <li><strong>amo*.d:</strong> Atomic read-modify-write, returns old value</li>
            <li><strong>Ordering bits:</strong> Can add .aq (acquire) and .rl (release) to fence operations</li>
            <li>All atomic ops are naturally aligned (8-byte for .d)</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">V Extension: Vector Instructions</h2>

        <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 text-sm">
          <p className="font-semibold mb-2">Vector Extension Overview:</p>
          <p>RISC-V Vector (RVV) provides scalable vector operations. Vector length (VLEN) is implementation-defined.
          Instructions process elements up to the vector length (vl) which is dynamically configured.
          This enables portable vector code that adapts to different hardware implementations.</p>
        </div>

        <InstructionTable
          instructions={vectorConfigInsts}
          title="Vector Configuration"
          sectionKey="vectorConfig"
        />

        <div className="bg-gray-50 p-4 rounded text-sm mb-6">
          <p className="font-semibold mb-2">Vector Configuration:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>vsetvli rd, rs1, vtypei:</strong> Set vl based on AVL (application vector length) in rs1</li>
            <li><strong>vsetivli rd, uimm, vtypei:</strong> Set vl based on immediate AVL value</li>
            <li><strong>vsetvl rd, rs1, rs2:</strong> Set vl and vtype using register values</li>
            <li><strong>vtype</strong> encodes: SEW (element width: 8/16/32/64), LMUL (vector register grouping)</li>
            <li><strong>vl:</strong> Actual number of elements processed (≤ AVL, ≤ VLMAX)</li>
            <li><strong>VLMAX = (VLEN/SEW) * LMUL:</strong> Maximum vector length for given config</li>
          </ul>
        </div>

        <InstructionTable
          instructions={vectorArithInsts}
          title="Vector Arithmetic & Logic"
          sectionKey="vectorArith"
        />

        <InstructionTable
          instructions={vectorMemInsts}
          title="Vector Memory Operations"
          sectionKey="vectorMem"
        />

        <div className="bg-blue-50 p-4 rounded text-sm mb-6">
          <p className="font-semibold mb-2">Vector Memory Access Patterns:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Unit-stride (vle/vse):</strong> Consecutive memory access, most efficient</li>
            <li><strong>Strided (vlse/vsse):</strong> Fixed stride between elements, useful for struct fields</li>
            <li><strong>Indexed (vlxei/vsxei):</strong> Variable offsets per element, for gather/scatter</li>
            <li><strong>Segment loads/stores:</strong> Load/store multiple vectors for interleaved data</li>
            <li>All operations respect active element mask (v0.t) when specified</li>
          </ul>
        </div>

        <InstructionTable
          instructions={vectorMaskInsts}
          title="Vector Mask & Comparison"
          sectionKey="vectorMask"
        />

        <div className="bg-green-50 p-4 rounded text-sm mb-6">
          <p className="font-semibold mb-2">Vector Registers & Masking:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>32 vector registers:</strong> v0-v31, each VLEN bits wide</li>
            <li><strong>v0:</strong> Commonly used as mask register for predicated operations</li>
            <li><strong>Register groups (LMUL):</strong> LMUL=2/4/8 groups registers for wider effective vectors</li>
            <li><strong>Masked operations:</strong> Add .v0.t suffix to mask with v0 (only where v0[i]=1)</li>
            <li><strong>Tail/inactive policies:</strong> Control behavior for inactive elements and tail elements</li>
            <li><strong>vstart CSR:</strong> Element index to resume from on trap, typically 0</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded text-sm">
          <p className="font-semibold mb-2">Vector Programming Model:</p>
          <div className="space-y-3">
            <div>
              <p className="font-medium">1. Configure vector length and element width:</p>
              <pre className="ml-4 mt-1 font-mono text-xs bg-white p-2 rounded">
vsetvli t0, a0, e32, m1, ta, ma  # Set SEW=32, LMUL=1 for a0 elements
              </pre>
            </div>
            <div>
              <p className="font-medium">2. Perform vector operations:</p>
              <pre className="ml-4 mt-1 font-mono text-xs bg-white p-2 rounded">
vle32.v v1, (a1)      # Load vector from address in a1
vle32.v v2, (a2)      # Load second vector
vadd.vv v3, v1, v2    # Element-wise addition
vse32.v v3, (a3)      # Store result
              </pre>
            </div>
            <div>
              <p className="font-medium">3. Use masking for conditional operations:</p>
              <pre className="ml-4 mt-1 font-mono text-xs bg-white p-2 rounded">
vmseq.vx v0, v1, x5   # Create mask: v0[i] = (v1[i] == x5)
vadd.vv v2, v3, v4, v0.t  # Masked add: only where v0[i]=1
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Instruction Formats</h2>
        <div className="bg-gray-50 p-4 rounded font-mono text-xs space-y-3">
          <div>
            <div className="font-semibold mb-1">R-type (register-register):</div>
            <div className="ml-4">funct7[31:25] | rs2[24:20] | rs1[19:15] | funct3[14:12] | rd[11:7] | opcode[6:0]</div>
          </div>
          <div>
            <div className="font-semibold mb-1">I-type (immediate):</div>
            <div className="ml-4">imm[31:20] | rs1[19:15] | funct3[14:12] | rd[11:7] | opcode[6:0]</div>
            <div className="ml-4 text-gray-600">imm is sign-extended 12-bit immediate</div>
          </div>
          <div>
            <div className="font-semibold mb-1">S-type (store):</div>
            <div className="ml-4">imm[31:25] | rs2[24:20] | rs1[19:15] | funct3[14:12] | imm[11:7] | opcode[6:0]</div>
          </div>
          <div>
            <div className="font-semibold mb-1">B-type (branch):</div>
            <div className="ml-4">imm[31:25] | rs2[24:20] | rs1[19:15] | funct3[14:12] | imm[11:7] | opcode[6:0]</div>
            <div className="ml-4 text-gray-600">imm is sign-extended, 2-byte aligned offset</div>
          </div>
          <div>
            <div className="font-semibold mb-1">U-type (upper immediate):</div>
            <div className="ml-4">imm[31:12] | rd[11:7] | opcode[6:0]</div>
            <div className="ml-4 text-gray-600">imm fills upper 20 bits, lower 12 bits are 0</div>
          </div>
          <div>
            <div className="font-semibold mb-1">J-type (jump):</div>
            <div className="ml-4">imm[31:12] | rd[11:7] | opcode[6:0]</div>
            <div className="ml-4 text-gray-600">imm is sign-extended, 2-byte aligned offset</div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">NewML Implementation Notes</h2>
        <div className="space-y-4 text-sm">
          <div className="bg-green-50 p-4 rounded">
            <p className="font-semibold mb-2">Ref counting:</p>
            <p>Single-threaded ref updates need no atomics. Use ld/addi/sd sequence. Only message boundaries need atomic ops.</p>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Message passing:</p>
            <p>Use amoadd.d or amoswap.d for queue head manipulation. LR/SC for more complex lock-free structures.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded">
            <p className="font-semibold mb-2">Pattern matching:</p>
            <p>Tag comparison uses ld + beq/bne. Multi-way switches can use computed jumps with auipc base.</p>
          </div>

          <div className="bg-orange-50 p-4 rounded">
            <p className="font-semibold mb-2">Arrays/strings:</p>
            <p>Base + (index &lt;&lt; shift) using slli + add, then single ld. Regular stride aids prefetching.</p>
          </div>

          <div className="bg-teal-50 p-4 rounded">
            <p className="font-semibold mb-2">Vector operations:</p>
            <p>Use RVV for bulk operations on arrays: map/filter/reduce over large collections. Configure vl with vsetvli, process chunks with vle/vadd/vse loops. Masking enables efficient filter operations. Strided loads handle non-contiguous data like struct fields. Use vector registers for parallel tag checks or batch reference count updates.</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded">
            <p className="font-semibold mb-2">SIMD string operations:</p>
            <p>Vector comparisons (vmseq) can scan strings for characters in parallel. Combine with mask operations to find first match. Useful for lexer/parser acceleration and pattern matching on string literals.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RISCVReference