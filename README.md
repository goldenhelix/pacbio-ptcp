# PacBio PureTarget Carrier Pipeline

This repository contains a workflow for PacBio PureTarget carrier screening analysis based on the [PacificBiosciences/ptcp](https://github.com/PacificBiosciences/ptcp) pipeline. 

The PacBio PureTarget Carrier Pipeline is a WDL-based workflow designed to genotype tandem repeat regions and homologous genes with segmental duplications using PacBio PureTarget data. It orchestrates several established PacBio tools in a containerized environment to deliver reproducible, per-sample and multi-sample results.

## Overview

This workflow provides a comprehensive PacBio PureTarget carrier screening analysis that includes:

1. **PTCP Analysis**: PureTarget Carrier Pipeline analysis for tandem repeats and homologous gene genotyping
   - **pbmm2**: Alignment of PacBio reads to reference genome
   - **TRGT**: Tandem repeat genotyping with visualization plots
   - **Paraphase**: Homologous gene haplotype analysis
   - **F8 Inversion Caller**: Detection of Factor VIII inversions
   - **ptcp-qc**: Quality control and structural variant detection (Sawfish)

2. **Variant Calling**: Sentieon DNAscope Long-Read for small variant detection
   - High-accuracy SNV and indel calling optimized for PacBio HiFi data

3. **VarSeq Integration**: Automated report generation
   - Comprehensive clinical report including pathogenicity assessment
   - Integration of repeat expansions, gene variants, and small variants
   - Citation of supporting literature (PMID articles)
   - Supporting graphs and visualizations from TRGT

## Workflow Parameters

### Required Inputs

- **Input Folder**: Directory containing PacBio BAM files to process
- **Output Folder**: Directory where all analysis results and reports will be stored
- **Reference File (FASTA)**: GRCh38 reference genome (optional, uses workspace default if not specified)

### Manifest File

The workflow requires a CSV manifest file specifying sample information:

```csv
sample_name,sample_sex
Sample001,F
Sample002,M
Sample003,F
```

- **sample_name**: Identifier for the sample (should match BAM filename prefix)
- **sample_sex**: Sex of the sample (M for male, F for female)

### Advanced Options

- **Paraphase Config File**: Configuration for gene haplotype analysis (default: `Meta/paraphase/paraphase_config.GRCh38.yaml`)
- **ptcp-qc BED**: Target regions for QC and structural variant analysis (default: `Meta/ptcp-qc/ptcp-qc.GRCh38.bed`)
- **TRGT Panel BED**: Panel definition for tandem repeat genotyping (default: `Meta/trgt/PureTarget_repeat_expansion_panel_2.0.repeat_definition.GRCh38.bed`)
- **Region BED File**: Targeted regions for variant calling (default: `Meta/PureTarget-carrier-v2.GRCh38.bed`)

## Input Requirements

The workflow expects PacBio HiFi BAM files in the input directory. Files should be named according to the sample identifiers specified in the manifest file (e.g., `Sample001.bam`).

## Output Structure

The workflow generates comprehensive outputs for each sample in the output folder:

### Per-Sample Outputs

- **Aligned BAM Files**: 
  - `{sample}.mapped.bam` - Aligned reads to reference genome with index files

- **Tandem Repeat Analysis**:
  - `{sample}.trgt.vcf.gz` - Genotyped tandem repeat variants
  - `{sample}.repeats.bam` - Reads spanning tandem repeat regions
  - `{sample}.motifs_allele.trgt_plots.zip` - Visualization plots for repeat motifs by allele
  - `{sample}.motifs_waterfall.trgt_plots.zip` - Waterfall plots for repeat motifs
  - `{sample}.meth_allele.trgt_plots.zip` - Methylation plots by allele
  - `{sample}.meth_waterfall.trgt_plots.zip` - Methylation waterfall plots
  - `motifs_allele.trgt_plots/` - Unzipped visualization plots

- **Gene Haplotype Analysis**:
  - `{sample}_paraphase/` - Paraphase output directory containing gene-specific alignments and JSON results

- **Factor VIII Inversion Analysis**:
  - `{sample}.f8inversion.vcf` - Factor VIII inversion calls
  - `{sample}.f8inversion.json` - Detailed inversion analysis results

- **Small Variant Calls**:
  - `{sample}.vcf.gz` - SNV and indel calls from Sentieon DNAscope

- **Quality Control**:
  - `{sample}.qc.json` - Comprehensive QC metrics including structural variants from Sawfish
  - `{sample}.mapping_stats_report.json` - Alignment statistics
  - `{sample}.ptcp.log` - PTCP execution log

- **Clinical Report**:
  - `{sample}.docx` - Comprehensive clinical report from VarSeq including:
    - Pathogenicity state of tandem repeats
    - Pathogenicity state of homologous genes (Paraphase)
    - Pathogenicity assessment of small variants
    - Target region coverage analysis
    - Citations of relevant PMID articles
    - Supporting graphs and visualizations from TRGT

## Individual Tasks

The repository provides individual tasks that can be run independently:

### Core Analysis Tasks
- **ptcp.task.yaml**: PureTarget Carrier Pipeline analysis (alignment, TRGT, Paraphase, F8 inversion, QC)
- **sention_cli_long_read.task.yaml**: Sentieon DNAscope long-read variant calling
- **ptcp_vspipeline.task.yaml**: VarSeq project creation and report generation

## Resource Requirements

The workflow requires:
- **CPU**: 16 cores for PTCP analysis, 8 cores for variant calling
- **Memory**: 32 GB RAM for PTCP analysis, 8 GB for variant calling
- **Storage**: Significant scratch storage space (~100-200GB per sample) for intermediate files

## Workflow Stages

### Stage 1: PTCP Analysis
Processes each sample through the complete PureTarget Carrier Pipeline, including alignment, tandem repeat genotyping, gene haplotype analysis, F8 inversion detection, and quality control.

### Stage 2: Long-Read Variant Calling
Performs high-accuracy SNV and indel calling using Sentieon DNAscope optimized for PacBio HiFi data. Structural variant calling is skipped as it's handled by the ptcp-qc module.

### Stage 3: VSPipeline Analysis
Creates a VarSeq project and generates comprehensive clinical reports integrating all analysis results, including pathogenicity assessments and supporting visualizations.
